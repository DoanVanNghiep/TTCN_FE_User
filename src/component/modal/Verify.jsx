import React, { useState, useEffect } from "react";
import { Button, Input, Form, notification } from "antd";
import { regenerateOTP, verifyAccount } from "@/api/forgotPassword";
// import * as AuthService from "@/services/AuthService"; // Giả sử AuthService có hàm verifyAccount và regenerateOTP

const Verify = ({ email, onVerified }) => {
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState("02:00");
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    const startCountdown = () => {
      const endTime = Date.now() + countdown * 1000;
      const timerInterval = setInterval(() => {
        const remainingTime = Math.max(0, endTime - Date.now());
        const remainingSeconds = Math.ceil(remainingTime / 1000);
        setCountdown(remainingSeconds);

        const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
        const seconds = String(remainingSeconds % 60).padStart(2, "0");
        setTimer(`${minutes}:${seconds}`);

        if (remainingSeconds <= 0) {
          clearInterval(timerInterval);
          notification.warning({
            message: "Hết thời gian!",
            description: "Vui lòng thử lại.",
          });
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    };

    startCountdown();
  }, [countdown]);

  const handleInputChange = (value, index) => {
    const updatedInputs = [...otpInputs];
    updatedInputs[index] = value;
    setOtpInputs(updatedInputs);

    if (value && index < otpInputs.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    clearErrors();
  };

  const handleBackspace = (index) => {
    if (!otpInputs[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const getOtp = () => otpInputs.join("");

  const clearErrors = () => {
    setOtpError("");
    setGeneralError("");
  };

  const handleVerify = async () => {
    const otp = getOtp(); // Lấy mã OTP từ các ô input
    console.log("OTP:", otp, "Email:", email);
  
    if (otp.length !== 6) {
      setOtpError("OTP phải đủ 6 ký tự.");
      return;
    }
  
    setLoading(true);
    try {
      verifyAccount({ email, otp }) // Gửi dữ liệu tới API
        .then((res) => {
          if (res.status === 200) {
            onVerified(); // Xử lý thành công
          }
        });
    } catch (error) {
      setGeneralError(error?.message || "Xác thực thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  

  const handleRegenerateOTP = async () => {
    setLoading(true);
    try {
      regenerateOTP({ email }).then((res) => {
        if (res.status === 200) {
          setOtpInputs(["", "", "", "", "", ""]);
          setCountdown(120);
          setTimer("02:00");
          notification.success({
            message: "OTP mới đã được gửi!",
          });
        }
      })
    } catch (error) {
      setGeneralError(error?.message || "Không thể gửi lại OTP. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="verify-container">
      <h2 className="verify-title">XÁC THỰC TÀI KHOẢN</h2>
      <p className="verify-description">
        Vui lòng nhập mã OTP mà chúng tôi đã gửi tới email của bạn:
        <br />
        <strong>{email}</strong>
      </p>

      <Form onFinish={handleVerify} className="otp-form">
        <div className="otp-inputs">
          {otpInputs.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") handleBackspace(index);
              }}
              className="otp-input"
              style={{ fontSize: "24px" }}
            />
          ))}
        </div>

        {otpError && <div className="error-message">{otpError}</div>}
        {generalError && <div className="error-message">{generalError}</div>}

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="verify-button"
          style={{ backgroundColor: "#84c5f4", color: "#fff", border: "none", height: "60px", fontSize: "18px", fontWeight: "bold" }}
        >
          Xác thực
        </Button>

        <div className="resend-container">
          Bạn chưa nhận được mã?
          <Button type="link" onClick={handleRegenerateOTP} >
            Gửi lại
          </Button>
        </div>
      </Form>

      <div className="timer-container">
        Mã có hiệu lực trong: <span className="timer">{timer}</span>
      </div>

      <style jsx>{`
        .verify-container {
          padding: 24px;
          max-width: 400px;
          margin: auto;
          background-color: #ffffff;
          border-radius: 10px;
          text-align: center;
        }

        .verify-title {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
          margin-bottom: 16px;
        }

        .verify-description {
          font-size: 16px;
          color: #666666;
          margin-bottom: 24px;
        }

        .otp-inputs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
          height: 60px;
        }

        .otp-input {
          width: 60px;
          height: 60px;
          text-align: center;
          font-size: 22px;
          border: 1px solid #cccccc;
          border-radius: 10px;
          transition: all 0.3s;
        }

        .otp-input:focus {
          outline: none;
          border-color: #1890ff;
        }

        .error-message {
          color: #ff4d4f;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .resend-container {
          font-size: 14px;
          margin-top: 16px;
        }

        .resend-container Button {
          padding: 0;
          font-size: 14px;
          color: #1890ff;
        }

        .timer-container {
          font-size: 14px;
          margin-top: 16px;
        }

        .timer {
          font-weight: bold;
          color: #333333;
        }
      `}</style>
    </div>
  );
};

export default Verify;
