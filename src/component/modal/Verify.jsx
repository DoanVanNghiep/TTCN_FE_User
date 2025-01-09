import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Form, notification } from "antd";
import { regenerateOTP, verifyAccount } from "@/api/forgotPassword";

const Verify = ({ email, onVerified }) => {
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState("02:00");
  const [countdown, setCountdown] = useState(120);
  const timerInterval = useRef(null);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerInterval.current);
  }, []);

  const startCountdown = () => {
    const startTime = Date.now();
    const endTime = startTime + countdown * 1000;

    timerInterval.current = setInterval(() => {
      const remainingTime = Math.max(0, endTime - Date.now());
      const secondsLeft = Math.ceil(remainingTime / 1000);
      setCountdown(secondsLeft);

      const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
      const seconds = String(secondsLeft % 60).padStart(2, "0");
      setTimer(`${minutes}:${seconds}`);

      if (secondsLeft <= 0) {
        clearInterval(timerInterval.current);
        alert("Hết thời gian! Vui lòng thử lại.");
      }
    }, 1000);
  };

  const handleFocusNext = (index) => {
    if (index < otpInputs.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleFocusPrev = (index) => {
    if (index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const getOtp = () => otpInputs.join("");

  const handleVerify = async () => {
    const otp = getOtp();

    if (otp.length !== 6) {
      setOtpError("OTP phải đủ 6 ký tự.");
      return;
    }

    setLoading(true);
    try {
      await verifyAccount({ email, otp });
      onVerified(otp); // Gửi sự kiện "verified" về cha
      clearInterval(timerInterval.current);
    } catch (error) {
      setGeneralError(error?.response?.data?.message || "Xác thực thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateOTP = async () => {
    setLoading(true);
    try {
      await regenerateOTP({ email });
      alert("OTP mới đã được gửi!");

      // Đặt lại thời gian đếm ngược là 2 phút
      setCountdown(120);
      clearInterval(timerInterval.current);
      startCountdown();
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message || "Không thể gửi lại OTP. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value, index) => {
    const updatedInputs = [...otpInputs];
    updatedInputs[index] = value;
    setOtpInputs(updatedInputs);

    if (value && index < otpInputs.length - 1) {
      handleFocusNext(index);
    }

    if (!value) {
      setOtpError("");
      setGeneralError("");
    }
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
