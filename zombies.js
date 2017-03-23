
class Item {
  constructor(name) {
    this.name = name;
  }
}

class Weapon extends Item {
  constructor(name, damage) {
    super(name);
    this.damage = damage;
  }
}

class Food extends Item {
  constructor(name, energy) {
    super(name);
    this.energy = energy;
  }
}

class Player {
  constructor(name, health, strength, speed) {
    this._pack = [];
    this._maxHealth = health;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.speed = speed;
    this.isAlive = true;
    this.equipped = false;
  }

  getPack() {
    return this._pack;
  }

  getMaxHealth() {
    return this._maxHealth;
  }

  checkPack() {
    console.log(this._pack);
  }

  takeItem(item) {
    if (this._pack.length >= 3) {
      console.log('Unable to add to pack: pack is full');
      return false;
    } else {
      this._pack.push(item);
      return true;
    }
  }

  discardItem(item) {
    if (this._pack.indexOf(item) === -1) {
      console.log(`Nothing was discarded: ${item.name} was not found`);
      return false;
    } else {
      var removed = this._pack.splice(this._pack.indexOf(item), 1)[0];
      console.log(removed.name + ' was removed');
      return true;
    }
  }

  equip(itemToEquip) {
    if (this.equipped ===  false) {
      if (this._pack.indexOf(itemToEquip) === -1) {
        console.log(`Nothing was equipped: ${itemToEquip.name} was not found`);
        return;
      } else {
        this.equipped = itemToEquip;
        this.discardItem(itemToEquip);
      }
    } else {
      this.discardItem(itemToEquip);
      this.takeItem(this.equipped);
      this.equipped = itemToEquip;
    }
  }

  eat(itemToEat) {
    if (itemToEat instanceof Food === true && this.discardItem(itemToEat) === true) {
      this.health += itemToEat.energy;
      if (this.health > this.getMaxHealth()) {
        this.health = this._maxHealth;
      }
        this.discardItem(itemToEat);
    } else {
      return;
    }
  }

  useItem(item) {
    if (item instanceof Weapon === true) {
      this.equip(item);
    } else if (item instanceof Food === true) {
      this.eat(item);
    }
  }

  equippedWith() {
    if (this.equipped !== false) {
      console.log(this.name + ' is equipped with ' + this.equipped.name);
      return this.equipped.name;
    } else {
      console.log(this.name +  'does not have a weapon equipped');
      return false;
    }
  }
}

class Zombie {
  constructor(health, strength, speed) {
    this._maxHealth = health;
    this.health = health;
    this.strength = strength;
    this.speed = speed;
    this.isAlive = true;
  }
}

class FastZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

class StrongZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

class RangedZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

class ExplodingZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}


/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  var player = new Player("Joan", 500, 30, 70);
  var zombie = new Zombie(40, 50, 20);
  var charger = new FastZombie(175, 25, 60);
  var tank = new StrongZombie(250, 100, 15);
  var spitter = new RangedZombie(150, 20, 20);
  var boomer = new ExplodingZombie(50, 15, 10);

  var shovel = new Weapon("shovel", 15);
  var sandwich = new Food("sandwich", 30);
  var chainsaw = new Weapon("chainsaw", 25);

  player.takeItem(shovel);
  player.takeItem(sandwich);
  player.takeItem(chainsaw);
  player.discardItem(new Weapon("scythe", 21));
  player.discardItem(shovel);
  player.checkPack();
  player.takeItem(shovel);
  player.checkPack();

  player.equippedWith();
  player.useItem(chainsaw);
  player.equippedWith();
  player.checkPack();

  player.useItem(shovel);
  player.equippedWith();
  player.checkPack();

  player.health = 487;
  console.log("Before health: " + player.health);
  player.useItem(sandwich);
  console.log("After health: " + player.health);
  player.checkPack();
}
runGame();
