new Vue({
    el: '#app',
    data: {
        gameStart: false,
        playerLife: 100,
        monsterLife: 100,
        log: [],
    },
    computed: {
        hasResult() {
            return this.playerLife <= 0 || this.monsterLife <= 0;
        }
    },
    methods: {
        startGame() {
            this.gameStart = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.log = [];
        },

        endGame() {
            this.gameStart = false;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.log = [];
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0;
            const hurt = this.getRandom(min+ plus, max+ plus);
            this[prop] = Math.max(this[prop] - hurt, 0);
            this.registerLog(`${source} atacou ${target} com ${hurt} de dano.`, cls);
        },
        attack(especial) {
            this.hurt('playerLife', 7, 12, false, 'player', 'monster', 'alert-warning');
            this.hurt('monsterLife', 5, 10, especial, 'monster', 'player', 'alert-danger');
        },
        health(min, max) {
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            this.registerLog(`player recuperou ${heal} de vida.`, 'alert-success');
        },
        healthAndHurt() {
            this.health(10, 15);
            this.hurt('playerLife', 7, 12, false, 'monster', 'player', 'alert-danger');
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value)
        },
        registerLog(text, cls){
            this.log.unshift({text, cls})
        }

    },
    watch: {

        hasResult(value) {
            if (value) this.gameStart = false;
        }
    }
})