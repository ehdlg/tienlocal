export class NotFoundError extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.estado = 404;
  }
}
