import { Assets } from '../../gfx/assets';
import { StaticEntity } from './static-entity';

let switchTimer = 60;

export class Switch extends StaticEntity {
	constructor(handler, x, y, width, height) {
		super(handler, x, y, width, height);
		this.assets = Assets.getAssets('tiles');
		this.type = 'switch';
		this.bounds.x = 5;
		this.bounds.y = 25;
		this.bounds.width = this.width - 18;
		this.bounds.height = this.height - 35;
		this.currentSwitch = this.assets.switchGreen;
	}

	tick(){
		switchTimer++;
	}

	toggleSwitch() {
		if (switchTimer < 40) return;

		if (this.currentSwitch === this.assets.switchGreen) {
			this.currentSwitch = this.assets.switchBlue;
			this.color = 'blue';
		} else {
			this.currentSwitch = this.assets.switchGreen;
			this.color = 'green';
		}

		// this.currentSwitch = this.currentSwitch === this.assets.switchGreen
		// 	? this.assets.switchBlue
		// 	: this.assets.switchGreen;

    this.handler.getWorld().swapGreenAndBlueTiles(this.color);

		switchTimer = 0;
	}

	render(g) {
		g.myDrawImage(this.currentSwitch,
			this.x - this.handler.getGameCamera().getxOffset(),
			this.y - this.handler.getGameCamera().getyOffset(),
			this.width,
			this.height);

		// ****** DRAW BOUNDING BOX DON'T DELETE!!
		// g.fillStyle = "white";
		// g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		// ****** DRAW BOUNDING BOX DON'T DELETE!!
	}
}
