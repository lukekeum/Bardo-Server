import './env';
import app from './app';

const { PORT = String(5000) } = process.env;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
