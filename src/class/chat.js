'use strict'

class Chat {
    constructor () {
        this.$socket = io.connect();
        this.$socket.on('connect', () => {
            console.log('打开了！')
        })
    }
}

export default new Chat()

