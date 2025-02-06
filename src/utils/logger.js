const PRIORITY = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    DISABLED: 99,
}

class Logger {
    constructor(priorityLevel = PRIORITY.INFO) {
        this.priorityLevel = priorityLevel
        this.logFuncTable = {
            [PRIORITY.DEBUG]: [console.debug, 'gray'],
            [PRIORITY.INFO]: [console.info, 'blue'],
            [PRIORITY.WARN]: [console.warn, 'yellow'],
            [PRIORITY.ERROR]: [console.error, 'red'],
        }
    }

    log(message, priority = PRIORITY.INFO) {
        if (priority < this.priorityLevel) return

        const msg = `[LOG-${this.getPriorityString(
            priority
        )}] ${new Date().toLocaleTimeString()}:\n${message}`

        const [logFunc, color] = this.logFuncTable[priority]

        logFunc('%c' + msg, 'color:' + color + ';font-weight:bold;')
    }

    table(msg, obj, priority = PRIORITY.INFO) {
        if (priority < this.priorityLevel) return

        this.log(msg, priority)
        console.table(obj)
    }

    getPriorityString(priority) {
        return Object.keys(PRIORITY).find((key) => PRIORITY[key] === priority)
    }
}

const logger = new Logger(PRIORITY.DEBUG)

const DebugLocations = ['127.0.0.1', 'localhost']
if (!DebugLocations.includes(window.location.hostname)) {
    logger.priorityLevel = PRIORITY.ERROR
}

// immutable global instance
Object.freeze(logger)

export { logger, PRIORITY }
