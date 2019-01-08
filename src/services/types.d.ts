import services from "./index";

declare module "Types" {
  type Services = ReturnType<typeof services>;
}
