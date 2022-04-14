type Tsignin = () => Promise<String>;

type Tsigninppt = {
  method: string;
  url: string;
  headers: {
    cookie: string;
  };
};
