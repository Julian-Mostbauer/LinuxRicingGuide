const PRIORITY = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
}

class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance
        }

        this.enabled = true
        this.priorityLevel = PRIORITY.DEBUG
        Logger.instance = this
    }

    setPriority(level) {
        this.priorityLevel = level
    }

    enable() {
        this.enabled = true
    }

    disable() {
        this.enabled = false
    }

    log(message, priority = PRIORITY.INFO) {
        if (this.enabled && priority >= this.priorityLevel) {
            console.log(
                `[LOG] ${new Date().toISOString()} [${this.getPriorityString(
                    priority
                )}]: ${message}`
            )
        }
    }

    table(obj, priority = PRIORITY.INFO) {
        if (this.enabled && priority >= this.priorityLevel) {
            console.log(
                `[LOG] ${new Date().toISOString()} [${this.getPriorityString(
                    priority
                )}]:`
            )
            console.table(obj)
        }
    }

    time(label) {
        if (this.enabled) {
            console.time(label)
        }
    }

    timeEnd(label) {
        if (this.enabled) {
            console.timeEnd(label)
        }
    }

    getPriorityString(priority) {
        return Object.keys(PRIORITY).find((key) => PRIORITY[key] === priority)
    }
}

const logger = new Logger()
logger.setPriority(PRIORITY.DEBUG)

Object.freeze(logger) // Optional: to prevent modifications to the singleton instance

export { logger, PRIORITY }
