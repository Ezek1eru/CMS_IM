import "next-auth";

declare module "next-auth" {
  interface User {
    role: number
  }

  interface JWT {
    role: number
  }
}