const PRIORITY = {
    DISABLED: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
}

class Logger {
    constructor(enabled = true, priorityLevel = PRIORITY.INFO) {
        this.enabled = enabled
        this.priorityLevel = priorityLevel
    }

    log(message, priority = PRIORITY.INFO) {
        if (priority < this.priorityLevel) return
        console.log(
            `[LOG] ${new Date().toISOString()} [${this.getPriorityString(
                priority
            )}]: ${message}`
        )
    }

    table(obj, priority = PRIORITY.INFO) {
        if (priority < this.priorityLevel) return
        console.log(
            `[LOG] ${new Date().toISOString()} [${this.getPriorityString(
                priority
            )}]:`
        )
        console.table(obj)
    }

    getPriorityString(priority) {
        return Object.keys(PRIORITY).find((key) => PRIORITY[key] === priority)
    }
}

const logger = new Logger(PRIORITY.DISABLED)

// immutable global instance
Object.freeze(logger)

export { logger, PRIORITY }
