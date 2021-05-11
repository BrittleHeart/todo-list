import dotenv from 'dotenv'
import Kernel from './app/http/Kernel'

// Loading environment variables
dotenv.config()

// bring up kernel loading
const application: Kernel = new Kernel(3400)

// loading routing
require('./routes/api')

// bootstraping the application
application.bootstrap()
