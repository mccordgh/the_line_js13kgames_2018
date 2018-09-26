# [The Core](https://mccordgh.github.io/the_line_js13kgames_2018/)

<img src="https://media.giphy.com/media/28g04nWnyycn0OkOkf/giphy.gif" alt="The Core title screen gif">

* Written in JavaScript

* The CORE was written for the yearly code-golfing competition js13kgames, running from August 13 2018 to September 13 2018. The goal of this competition is to submit a full game made within a month, with all assets, libraries, etc coming in at under 13Kb compressed and able to run off-line. The theme of this competition was "offline".

* You are one of many workers trapped in a factory and forced to work on THE CORE, a sinister mind control machine. The first version of THE CORE currently has everyone in the factory (workers, guards, managers) under it's control. The second version will enslave the world! Find the four keys, and use the on THE CORE to take it offline for good!

For a fun surprise, make sure to speak to a guard after you have taken the machine offline :)

## Play The Core now:

* https://mccordgh.github.io/the_line_js13kgames_2018/

## Download and run locally:

```
1. $ git clone git@github.com:mccordgh/the_line_js13kgames_2018.git
2. $ cd the_line_js13kgames_2018
3. $ npm install
4. $ npm run start
5. Navigate to / click the url displayed in the console.
```

# Post Mortem

### The Idea

* This year I got a late start on my entry, due to life things (I got married in July, my wife and I quit our jobs in August, and then we moved out to Washington state to search for new careers in Seattle and the surrounding areas). We took an 8 day long road trip as a honeymoon and, while not driving, I was still hacking away on the entry up until the 11th of September :)

* A few ideas quickly came to mind for the theme of this year's js13kgames competition, "offline", such as "power goes out", or "systems are offline" etc. I felt like those could potentially be fairly obvious and used by a lot of other entries.

* I eventually just broke the theme down in to two words: "off" and "line". Then an idea hit me. You are a worker in a factory and there is some sort of "line" of workers moving through the factory. Maybe a work shift change is happening, or something more sinister is afoot? As soon as you hit a movement key you would take control of one of those workers and jump "off" the "line". (GET IT?) This is why the game was originally titled "The Line" instead.

* There were some issues with creating the worker line as far as being confusing or blocking off movement in certain ways for the player, so I finally settled on there being a machine in the spawn room that you and three others are working on. The machine is called "the core", and it is mind controlling the factory workers (and soon the world!). This gives the player an end goal which is to find the four keys and shut down the core.

## **What went right**

### Siren hats

<img src="https://media.giphy.com/media/6bb0m0FpXVYKjQrMju/giphy.gif" alt="The guard with a siren hat">

* I *love* the siren hats. They are my *favorite*. I wanted a way to communicate to the player, "The guard npc is like a policeman for the factory and they will arrest you." At first I just put a siren above the head, but thanks to community feedback it quickly became a full siren hat! I **love** the siren hats. They are my **favorite** :D

* If you speak to a guard after putting all four keys in to the machine, they will give you a siren hat! :)

<img src="https://media.giphy.com/media/1X63u21RvdxZnmg4iW/giphy.gif" alt="The player with a siren hat">

### Procedural Room Generation

* In the game, there are always 16 rooms. The layout looks like this:

```
[ 0 ] [ 1 ] [ 2 ] [ 3 ]
[ 4 ] [ 5 ] [ 6 ] [ 7 ]
[ 8 ] [ 9 ] [10 ] [11 ]
[12 ] [13 ] [14 ] [15 ]
```

* The rooms are given a full border of walls, and then traits such as `noTop`, `noRight`, `noBottom`, `noLeft` will cull out room exits where appropriate. 

* The player and "the core" machine will always spawn in either room 5, 6, 9, or 10 (`createMachineRoom` function).

* The keys, along with the sleeping "manager" npc, will then spawn randomly in a room where the player or another key has not already spawned (`createKeyRooms`, `addManagers` functions).

* After this, all remaining rooms will spawn a little machine with two workers and a guard (`spawnGuards`, `addProps` functions).

* Finally, a 17th room is created which is the happy outside for the ending screen. (`finalRoom` function)

* Some of the room generator function code below. [click for full source](https://github.com/mccordgh/the_line_js13kgames_2018/blob/master/src/app/classes/worlds/generate-rooms.js)
```
export default function(start) {
  let rooms = {
    0: new Room(  0, [noTop, noLeft]),
    1: new Room(  1, [noTop]),
    2: new Room(  2, [noTop]),
    3: new Room(  3, [noTop, noRight]),
    4: new Room(  4, [noLeft]),
    5: new Room(  5, [noRight]),
    6: new Room(  6, [noLeft]),
    7: new Room(  7, [noRight]),
    8: new Room(  8, [noLeft]),
    9: new Room(  9, [noRight]),
    10: new Room( 10, [noLeft]),
    11: new Room( 11, [noRight]),
    12: new Room( 12, [noBottom, noLeft]),
    13: new Room( 13, [noBottom]),
    14: new Room( 14, [noBottom]),
    15: new Room( 15, [noRight, noBottom]),
    16: new Room( 16, [], [], TILE_SIZE, TILE_COUNT, {p: 2, w: 3})
  };

  let r = startRoom(rooms[start]);
  rooms[start] = new Room( r.id, r.traits, r.entities);

  rooms = createKeyRooms(rooms);
  rooms = createMachineRoom(rooms);
  rooms = spawnGuards(rooms);
  rooms = addProps(rooms);
  rooms = addManagers(rooms);
  rooms = finalRoom(rooms);

  return rooms;
};
```

### Global animation timer

* I really wanted this to feel like a living breathing little factory, where everyone and everything was in sync (thematic to the the mind control plot). This was accomplished by removing the animations speeds and frame checks for all animations, and having them instead point to the Animation object and it's global timer. This puts all the animations in sync and creates a nice lovely vibe which goes well with...

### "Procedural Music"

* Leveraging the global animation timer, I was able to play individual sounds at a standard rythm. This helped make the music sync up with the animations, and allowed for speeding up or slowing down the animations and music together.

* Some of the animation and music timing code: [click for full source](https://github.com/mccordgh/the_line_js13kgames_2018/blob/master/src/app/classes/gfx/animation-timer.js)

* `factoryNoise` is the function responsible for playing the sounds when appropriate.
```
    this.beats = {
      1: [
      ],
      //sounds on the 1.5 beat
      2: [
        { name: 'steamLow', condition(k) { return true }},
        { name: 'bassC', condition(k) { return k <= 3 }},
        { name: 'endBassC', condition(k) { return k > 4 }},
      ],
      3: [
        { name: 'arpFsG', condition(k) { return k == 0 }},
      ],
      //sounds on the 2.5 beat
      4: [
        { name: 'bassDs', condition(k) { return k <= 1 }},
        { name: 'stabFACD', condition(k) { return k > 4 }},
      ],
      5: [
        { name: 'arpAsC', condition(k) { return k == 0 }},
      ],
      //sounds on the 3.5 beat
      6: [
        { name: 'steamHigh', condition() { return true}},
        { name: 'bassDs', condition(k) { return k > 1 && k < 3}},
        { name: 'bassFs', condition(k) { return k <= 1 }},
        { name: 'endBassF', condition(k) { return k > 4 }},
      ],
      7: [
      ],
      //sounds on the 4.5 beat
      8: [
        { name: 'bassDs', condition(k) { return k <= 2 }},
      ],
    }
  }

  tick() {
    if (!this.stop) {
      if (machine) {
        machine = this.handler.getMachine();
      }

      this.timer += Date.now() - this.lastTime;
      this.lastTime = Date.now();

      if (this.timer >= this.speed){
        if (this.sounds) this.factoryNoise();
        this.index++;
        this.timer = 0;
        if (this.index >= this.frames)
          this.index = 0;
      }
    }
  }

  factoryNoise() {
    c++;

    this.playAll(this.beats[c]);
    if (c == 8) c = 0;
  }

  playAll(s){
    let sm = this.sounds;
    let k = this.keys;

    for (let i = 0; i < s.length; i++) {
      if (s[i].condition(k)) {
        sm.load(s[i].name);
        sm.play(s[i].name);
      }
    }
  }
}
```

* Using the global animation timer, I was able to account for 8 "beats". Depending on the number of keys that have been added to the machine, Different sounds would play concocting the background music. Each sound has the "beat" that it plays on, and the condition function which will return true if it should be playing in the current context, or false if it shouldn't be playing.

## **What went wrong**

### Making interesting rooms

* It turns out this costs a lot of space, more so than I had hoped. The way the engine is set up right now, each room can have a lot of unique traits, npcs, tiles, layout, etc.

* I really hoped to do more with making the rooms feels unique, as to help orient the player, but I ran out of space and then time to optimize and find the space!

* I have a branch where I was working on adding in another color of floor tile. I wanted to give the rooms unique floor tile patterns to better help orient the player and distinguish the rooms.

### Guard AI

* I didn't get a chance to implement a good pathing algorithm for the guards, so there is a chance they can get stuck on a solid object while trying to chase you. For a quick fix, if they are stuck for more than a couple seconds, they will just go back to patrolling and wait a few more seconds to search for you again.

### Sleepy Managers

* I was really hoping to have another type of "enemy" in the game. I ran out of time and resources to figure out something cool for the managers to do, so I figured they could just sleep on the job. Classic managers, amirite?!

## In conclusion...

* I think this project ended up pretty rad given the time I was able to spend on it! There are so many impressive entries this year. This community is really great! I look forward to js13k 2019! :)

* I also really wanted to work on my pixel art skills, and I think I may have bumped them from abysmall to "okay, maybe". haha... SUCCESS!

* Thanks for reading, feel free to follow / dm me on twitter and let's chat about whatever! [@mattmccordmattm](https://twitter.com/mattmccordmattm)