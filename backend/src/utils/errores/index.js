export class HTTPError extends Error {
  constructor({ mensaje, estado }) {
    super(mensaje);
    this.estado = estado;
  }
}
