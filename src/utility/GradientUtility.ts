import { FillGradient } from "pixi.js";

export class Gradient {
    public static bottomBar: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, [0,0,0,0.3]).addColorStop(0, [0,0,0,0.5])
}