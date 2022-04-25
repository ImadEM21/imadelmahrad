interface HttpResponse {
    headers: {
      "Content-Type": string;
      "Last-Modified": string;
    };
    statusCode: number;
    body: object;
  }
  
  export { HttpResponse };