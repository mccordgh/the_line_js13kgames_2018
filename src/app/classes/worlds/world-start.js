import { EntityManager } from '../entities/entity-manager';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';

import { Room } from './room';
import { GameState } from '../states/game-state';
import { World } from './world';
import Key from '../entities/statics/key';

let pauser = 199, change = false;
// change = true;

export class WorldStart {
    constructor(handler) {
        this.handler = handler;
        this.keyManager = handler.getKeyManager();
        this.room = new Room(0, [], [], 32, 24);
        this.entityManager = new EntityManager(handler, new Player(handler, 9, 2));
        this.spatialGrid = new SpatialGrid(GAME_SIZE, GAME_SIZE, TILE_SIZE);
        handler.setWorld(this);
        this.state = 1;
        // this.state = 2;

        this.init();
    }

    tick(dt) {
        let e = this.entityManager;
        // this.getInput();

        switch (this.state) {
            case 1:
                this.room.tick();
                e.tick(dt);

                if (e.getPlayer().item) {
                    this.handler.getSoundManager().play('place');
                    this.state = 2; // pause before starting game
                }

                break;
            case 2:
                pauser--;

                if (change) {
                    let gameState = new GameState(this.handler, new World(this.handler));
                    this.handler.getGame().getGameState().setState(gameState);
                }
            break;
        }
    }

    render(g) {
        g.globalAlpha = pauser == 119 ? 1 : (pauser / 119);

        if (pauser == 0) {
            g.globalAlpha = 1;
            change = true;
        }

        this.room.render(g);
        this.entityManager.render(g);

        /*
            pink = #ff77a8
            green = #00e436
            yellow = #ffec27
            blue = #29adff
        */

        g.drawText('Move with WASD or ZQSD !', 126, 538, '#ffec27')
        g.drawText('WASD', 261, 538, '#ff77a8')
        g.drawText('ZQSD', 385, 538, '#00e436')
        // g.drawText('PRESS [ENTER] TO START THE REVOLUTION!', 76, 538, '#ffec27')
        // g.drawText('ENTER', 187, 538, '#00e436')
        // g.drawText('REVOLUTION !', 465, 555, '#ff77a8')
        g.drawText('GRAB THE KEYS !', 264, 680, '#ffec27')
        g.drawText('KEYS', 414, 680, '#29adff')

    }

    // getInput() {
    //     let m = this.keyManager;

    //     if (m.enter) {
    //         let gameState = new GameState(this.handler, new World(this.handler));
    //         this.handler.getGame().getGameState().setState(gameState);
    //     }
    // }

    init() {
        let h = this.handler;
        let r = this.room;

        this.setTiles();
        [
            new Key(h, 1, 10, 'p', true),
            new Key(h, 3, 10, 'g', true),
            new Key(h, 8, 10, 'b', true),
            new Key(h, 10, 10, 'y', true),
        ].forEach((e) => { r.addEntity(e) });

        this.entityManager.newRoom(null, this.room);
    }

    setTiles() {
        this.room.tileSet = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }

    getSpatialGrid() {
        return this.spatialGrid;
    }
}
