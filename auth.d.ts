import "next-auth";

declare module "next-auth" {
  interface User {
    id: string
    role: ROLE
  }

  interface JWT {
    id: string
    role: ROLE
  }
}