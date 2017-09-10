import { Assets } from '../../gfx/assets';
import { StaticEntity } from './static-entity';

export class JournalPage extends StaticEntity {
	constructor(handler, x, y, width, height, journal) {
		super(handler, x, y, width, height);
		// this.assets = Assets.getAssets('tiles');
		this.type = 'journal';
		this.bounds.x = 10;
		this.bounds.y = 5;
		this.bounds.width = this.width - 30;
		this.bounds.height = this.height - 20;
		this.journal = journal;
		this.triggered = false;
	}

	tick() {
		//
	}

	render(g) {
		// g.myDrawImage(this.assets.exit,
		// 	this.x - this.handler.getGameCamera().getxOffset(),
		// 	this.y - this.handler.getGameCamera().getyOffset(),
		// 	this.width,
		// 	this.height);
    let x = this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(),
      y = this.bounds.y + this.y - this.handler.getGameCamera().getyOffset();

		// ****** DRAW BOUNDING BOX DON'T DELETE!!
		g.fillStyle = Math.random() < .5 ? 'white' : 'brown';
		g.fillRect(x, y, this.bounds.width, this.bounds.height);

    g.fillStyle = 'black';
    g.strokeRect(x, y, this.bounds.width, this.bounds.height);
    for (let i = 8; i < 40; i += 8) {
		  g.fillRect(x, y + i, this.width - 30, 2);
    }


		// ****** DRAW BOUNDING BOX DON'T DELETE!!
	}

	triggerEntry() {
		if (this.triggered) return;

		this.triggered = true;

		this.journal.getText().forEach((entry) => {
			this.handler.getWorld().dialogue.addWords(this.journal.name, entry);
		});
	}
}
