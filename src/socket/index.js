import io from 'socket.io-client';

let client;
export default (baseUrl) => {
  if (client) return client;
  client = io.connect(
    baseUrl
  );
  return client;
};
