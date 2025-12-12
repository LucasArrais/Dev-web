import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import type { TokenResponse } from "../interfaces/TokenResponse";
import type { UsuarioLogin } from "../interfaces/UsuarioLogin";
import useTokenStore from "../stores/TokenStore";
import useLoginStore from "../stores/LoginStore";
import isErrorResponse from "../util/isErrorResponse";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .nonempty("Informe o email.")
    .email("Informe um email válido."),
  senha: z
    .string()
    .nonempty("Informe a senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
});

type FormLogin = z.infer<typeof schema>;

interface LoginFormProps {
  labelClassName?: string;
  inputClassName?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  labelClassName = "mb-3", 
  inputClassName = "mb-2" 
}) => {
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const loginInvalido = useLoginStore((s) => s.loginInvalido);
  const msg = useLoginStore((s) => s.msg);

  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTokenResponse({ idUsuario: 0, token: "", nome: "", role: "" });
  
    return () => {
      setLoginInvalido(false);
      setMsg("");
    };
  }, []);

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      senha: ""
    }
  });
  
  const { mutate: efetuarLogin } = useEfetuarLogin();

  const submit = ({ email, senha }: FormLogin) => {
    const usuarioLogin: UsuarioLogin = { email, senha };
    efetuarLogin(usuarioLogin, {
      onSuccess: (tokenResp: TokenResponse) => {
        setTokenResponse({
          idUsuario: tokenResp.idUsuario,
          token: tokenResp.token,
          nome: tokenResp.nome,
          role: tokenResp.role,
        });
        
        const from = (location.state as any)?.from?.pathname || "/";
        navigate(from, { replace: true });
      },
      onError: (error) => {
        if (isErrorResponse(error)) {
          setLoginInvalido(true);
          setMsg("Login inválido");
        } else {
          console.log("deu erro", error);
          
          if (error.message.includes("401")) {
            setLoginInvalido(true);
            setMsg("Email ou senha inválidos.");
          } else {
            setLoginInvalido(true);
            setMsg(
              "Não foi possível efetuar o login. Por favor, tente mais tarde."
            );
          }
        }
      },
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      {loginInvalido && (
        <div className="alert alert-danger fw-bold mb-4" role="alert">
          {msg}
        </div>
      )}
      
      <div className="mb-4">
        <label 
          htmlFor="email" 
          className={`form-label fw-bold ${labelClassName}`}
          style={{ 
            color: '#e9eef6',
            display: 'block'
          }}
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`form-control ${inputClassName}`}
          placeholder="seu@email.com"
          style={{ 
            backgroundColor: '#1b2a41',
            borderColor: '#2a3d5a',
            color: '#e9eef6',
            borderRadius: '6px',
            padding: '10px 12px',
            fontSize: '1rem'
          }}
          disabled={isSubmitting}
        />
        {errors.email && (
          <div className="mt-2">
            <small style={{ 
              color: "#ff6b6b", 
              fontSize: "0.875rem",
              display: 'block'
            }}>
              {errors.email.message}
            </small>
          </div>
        )}
      </div>

      <div className="mb-5">
        <label 
          htmlFor="senha" 
          className={`form-label fw-bold ${labelClassName}`}
          style={{ 
            color: '#e9eef6',
            display: 'block'
          }}
        >
          Senha
        </label>
        <input
          {...register("senha")}
          type="password"
          id="senha"
          className={`form-control ${inputClassName}`}
          placeholder="••••••••"
          style={{ 
            backgroundColor: '#1b2a41',
            borderColor: '#2a3d5a',
            color: '#e9eef6',
            borderRadius: '6px',
            padding: '10px 12px',
            fontSize: '1rem'
          }}
          disabled={isSubmitting}
        />
        {errors.senha && (
          <div className="mt-2">
            <small style={{ 
              color: "#ff6b6b", 
              fontSize: "0.875rem",
              display: 'block'
            }}>
              {errors.senha.message}
            </small>
          </div>
        )}
      </div>

      <div className="d-grid">
        <button 
          type="submit" 
          className="btn btn-primary py-3 fw-bold"
          style={{ 
            backgroundColor: '#6fb1ff',
            borderColor: '#6fb1ff',
            color: '#0e1726',
            borderRadius: '6px',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
          disabled={isSubmitting}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#8bc1ff';
            e.currentTarget.style.borderColor = '#8bc1ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#6fb1ff';
            e.currentTarget.style.borderColor = '#6fb1ff';
          }}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;