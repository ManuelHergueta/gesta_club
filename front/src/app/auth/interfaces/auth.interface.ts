export interface UsuarioLogin {
  email: string;
  password: string;
}

export interface Auth {
  success: boolean;
  data: {
      email: string;
      token: string;
  }
  msg: string;
}

export interface UsuarioRegister {
  nombre: string;
  email: string;
  password: string;
}

export interface Register {
  success: boolean;
  msg: string;
}

export interface ExisteResponse {
  success: boolean;
  email: string;
}
