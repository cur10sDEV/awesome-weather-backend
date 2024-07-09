export class ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;

  constructor(statusCode: number, message = "success", data: any = {}, success = true) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
