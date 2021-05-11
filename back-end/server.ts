import dotenv from 'dotenv'
import Kernel from './app/Kernel'

// Loading environment variables
dotenv.config()

const PORT: number | any = process.env.PORT || process.env.APP_PORT

// bring up kernel loading
const application: Kernel = new Kernel(PORT)

// loading routing
require('./routes/api')

// bootstraping the application
application.bootstrap()
