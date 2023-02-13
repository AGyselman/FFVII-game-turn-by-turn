const app = Vue.createApp({
  data() {
    return {
      hit: false,
      heal1: 30,
      healCloud: 0,
      soin: "",
      pvPlayer: 100,
      pvIa: 100,
      tour: 0,
      atkResponse: 0,
      atkCloud: 0,
      fuite: true,
      game_over: true,
      isActive: true,
      test: false,
      combat: "",
      combatResponse: [],
      victory: true,
      sound: new Audio("./images/victory.ogg"),
      shakeAdv: 0,
      shakePlayer: 0,
    };
  },

  methods: {
    attackPlayer() {
      //gestion des messages de combat
      if (this.combatResponse.length > 2) {
        this.combatResponse = [];
      }
      //attack and shake adversary
      this.atkCloud = 10;
      this.pvIa -= this.atkCloud;
      this.shakeAdversary();
    //   this.atkCloud = !this.atkCloud;
      setTimeout(() => {
        this.atkCloud = !this.atkCloud;
      }, 500);
      ///////// PV perdu /////////
      this.combat = `l'attaque vient d'enlever ${this.atkCloud} PV à l'énnemi`;
      this.combatResponse.push(this.combat);
      // ataque IA
      // random = Math.floor(Math.random()*(20-10)+10);
      // this.atkResponse = random;
      // this.pvPlayer -= this.atkResponse;
      // this.combat = `l'IA vient de vous enlever ${random} PV`;
      // this.combatResponse.push(this.combat);

      // incrementation tour
      if (this.tour === 3) {
        this.tour = 0;
      } else {
        this.tour++;
        console.log(`tour = ${this.tour}`);
      }
      this.attackAdv();
    },

    attackAdv() {
      let deg = Math.floor(Math.random() * (20 - 10) + 10);
      setTimeout(() => {
        this.pvPlayer -= deg;
      }, 500);
      this.combat = `l'IA vient de vous enlever ${deg} PV`;
      this.combatResponse.push(this.combat);
      setTimeout(() => {
        this.shakePlayerF();
      }, 500);
      setTimeout(() => {
        this.atkResponse = !this.atkResponse;
      }, 500);
      setTimeout(() => {
        this.atkResponse = !this.atkResponse;
      }, 1000);
    },

    attackSpecial() {
      if (this.combatResponse.length > 2) {
        this.combatResponse = [];
      }
      //gestion des messages de combat

      //////////////////// PV perdu //////////////
      this.atk = 20;
      this.pvIa -= this.atk;
      this.shakeAdversary();

      //////////////////// PV perdu //////////////
      //gestion des messages de combat
      this.combat = `l'attaque spéciale d'enlever ${this.atk} PV à l'énnemi`;
      this.combatResponse.push(this.combat);
      //gestion des messages de combat

      console.log(`l'attaque spé enlève ${this.atk} PV`);

      // gestion de l'IA
      random = Math.trunc(Math.random() * (20 - 10) + 10);
      this.atk = random;
      this.pvPlayer -= this.atk;

      //gestion des messages de combat
      this.combat = `l'IA vient de vous enlever ${random}`;
      this.combatResponse.push(this.combat);
      //gestion des messages de combat

      //////////anmiation IA
      //anmiation IA ///////

      this.test = !this.test;
      this.tour = 0;
    },

    heal() {
      if (this.combatResponse.length > 2) {
        this.combatResponse = [];
      }
      let heal = 30;
      this.pvPlayer += heal;
      this.soin = `Cloud récupere ${heal} PV `;
      this.combatResponse.push(this.soin);
      this.healCloud = !this.healCloud;
      setTimeout(() => {
        this.healCloud = !this.healCloud;
      }, 500);
      setTimeout(() => {
        this.attackAdv();
      }, 200);
    },

    shakePlayerF() {
      this.shakePlayer = !this.shakePlayer;
      setTimeout(() => {
        this.shakePlayer = !this.shakePlayer;
      }, 300);
    },

    shakeAdversary() {
      this.shakeAdv = !this.shakeAdv;
      setTimeout(() => {
        this.shakeAdv = !this.shakeAdv;
      }, 300);
    },

    flee(x) {
      if (x === 1) {
        this.fuite = !this.fuite;
      }
      if (x === 2) {
        this.game_over = false;
      }
    },
  },

  computed: {},

  watch: {
    tour(value) {
      if (value === 3) {
        this.test = !this.test;
      }
    },
    pvIa(value) {
      if (value <= 0 && this.pvPlayer > 0) {
        this.victory = false;
        this.pvIa = 0;
        this.sound.play();
      }
    },
    pvPlayer(value) {
      if (value <= 0) {
        this.game_over = false;
        this.pvPlayer = 0;
      }
    },
  },
});
app.mount("#monApp");
