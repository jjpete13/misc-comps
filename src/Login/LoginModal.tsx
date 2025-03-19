import { Button, Card, CardContent, CardHeader, Input, Typography } from "@mui/material";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "../toast/toastObserver";

export default function LoginModal() {
  const [reveal, setReveal] = useState(false);
  const inputRef = useRef("");

  const handleReveal = () => {
    setReveal(() => !reveal);
  };

  const handleLogin = () => {
    toast.success("Login successful");
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="Login" sx={{ maxWidth: 345, backgroundColor: "#f5f5f5", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)" }}>
        <CardHeader align="center" title="Login" />
        <CardContent sx={{textAlign: "left"}}>
          <Typography variant="h6" align="center">Username</Typography>
          <Input sx={{width: "calc(100% - 20px)"}}/>
          <Typography variant="h6" align="center">Password</Typography>
          <Input
            sx={{padding: '4px 0 5px 5px'}}
            type={!reveal ? "password" : "text"}
            ref={inputRef}
          />
          <Button
            sx={{
              align: "center",
              margin: "0px",
              padding: "0px",
              minWidth: "0px",
              width: "fit-content",
            }}
            onClick={handleReveal}
          >
            {!reveal ? (
              <VisibilityIcon
              fontSize="small"
                sx={{
                  color: "black",
                }}
              />
            ) : (
              <VisibilityOff
              fontSize="small"
                sx={{
                  color: "black",
                }}
              />
            )}
          </Button>

          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                align: "center",
                margin: "10px",
                padding: "10px",
                justifyContent: "center",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}