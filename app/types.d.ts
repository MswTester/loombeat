// types.d.ts

// global types

type Vector2 = [number, number];

interface Transform{
    position: Vector2; // position of the object
    rotation: number; // rotation of the object
    scale: Vector2; // scale of the object
    alpha: number; // alpha of the object 0 ~ 1
    pivot: Vector2; // pivot of the object
    tint: number; // tint of the object
}

type Easing =
    "linear" |
    "easeInQuad" |
    "easeOutQuad" |
    "easeInOutQuad" |
    "easeInCubic" |
    "easeOutCubic" |
    "easeInOutCubic" |
    "easeInQuart" |
    "easeOutQuart" |
    "easeInOutQuart" |
    "easeInQuint" |
    "easeOutQuint" |
    "easeInOutQuint" |
    "easeInSine" |
    "easeOutSine" |
    "easeInOutSine" |
    "easeInExpo" |
    "easeOutExpo" |
    "easeInOutExpo" |
    "easeInCirc" |
    "easeOutCirc" |
    "easeInOutCirc" |
    "easeInElastic" |
    "easeOutElastic" |
    "easeInOutElastic" |
    "easeInBack" |
    "easeOutBack" |
    "easeInOutBack" |
    "easeInBounce" |
    "easeOutBounce" |
    "easeInOutBounce";

type FilterName =
    "AdjustmentFilter" |
    "AdvancedBloomFilter" |
    "AsciiFilter" |
    "BevelFilter" |
    "BloomFilter" |
    "BlurFilter" |
    "BulgePinchFilter" |
    "ColorMapFilter" |
    "ColorOverlayFilter" |
    "ColorReplaceFilter" |
    "ConvolutionFilter" |
    "CrossHatchFilter" |
    "CRTFilter" |
    "DisplacementFilter" |
    "DotFilter" |
    "DropShadowFilter" |
    "EmbossFilter" |
    "GlitchFilter" |
    "GlowFilter" |
    "GodrayFilter" |
    "GrayscaleFilter" |
    "HslAdjustmentFilter" |
    "KawaseBlurFilter" |
    "MotionBlurFilter" |
    "MultiColorReplaceFilter" |
    "NoiseFilter" |
    "OldFilmFilter" |
    "OutlineFilter" |
    "PixelateFilter" |
    "RadialBlurFilter" |
    "ReflectionFilter" |
    "RGBSplitFilter" |
    "ShockwaveFilter" |
    "SimpleLightmapFilter" |
    "TiltShiftFilter" |
    "TwistFilter" |
    "ZoomBlurFilter";

// save types

interface LevelDisplay{
    song: string; // song name
    artist: string; // artist name
    difficulty: number; // difficulty level
    bpm: string; // bpm for level display (e.g. 120-150)
    chart: string; // chart maker
    thumbnail: string; // thumbnail image
}

interface Level extends LevelDisplay{
    backgroundColor: number; // background color of the level
    notelines: S_Noteline[]; // notes in the level
    sprites: S_Sprite[]; // sprites in the level
    texts: S_Text[]; // texts in the level
    blocks: S_Block[]; // blocks in the level
    camera: Object; // camera in the level
}

interface S_Block{
    offset: number; // block offset (ms)
    split: number; // block split (beats)
    length: number; // block length (beats) 마디
    bpm: number; // block bpm
}

interface GameEvent{
    type: string; // event type
    time: number; // event timing (ms)
    duration: number; // event duration (ms)
    ease: Easing; // event easing
    data: any; // event data
}
// e.g. { type: "position", time: 1200, duration: 850, ease: "easeInOutQuad", data: { start: [0, 0], end: [.3, .8] } }
// e.g. { type: "texture", time: 1200, duration: 0, ease: "easeInOutQuad", data: { end: "assets/sprites/1.png" } }
// e.g. { type: "bpm", time: 250, duration: 300, ease: "easeInOutQuad", data: { start: 120, end: 170 } }
// e.g. { type: "bloomFilter", time: 1700, duration: 350, ease: "easeInOutQuad", data: { start: [0, 0, 0], end: [6, 6, 2], index: 0 } }

interface S_Object{
    transform: Transform; // transform of the object
    filters: Filter[]; // filters of the object
    blendMode: PIXI.BLEND_MODES | ""; // blend mode of the object
    mask: string; // object id for masking
    events: GameEvent[]; // events in the object
}

interface S_Noteline extends S_Object{
    notes:S_Note[]; // notes in the noteline
    key:string; // key for the noteline (e.g. "d", "f", "j", "k")
    bpm:number; // bpm for the noteline
}

type S_Note = [number, number]; // [note timing (ms), note type (0-2)] 0: tap, 1: hold start, 2: hold end


interface S_Sprite extends S_Object{
    texture: string; // texture of the sprite
}

interface S_Text extends S_Object{
    text: string; // text of the text
    style: PIXI.TextStyleOptions; // style of the text
}

// game state types

interface Filter{
    type: FilterName; // filter type
    data: any; // filter data
}

interface ObjectState{
    id: string; // id of the object
    transform: Transform; // transform of the object
    filters: Filter[]; // filters of the object
    blendMode: PIXI.BLEND_MODES | ""; // blend mode of the object
    mask: string; // object id for masking
}

interface NotelineState extends ObjectState{
    notes: NoteState[]; // notes in the noteline
    key: string; // key for the noteline
    bpm: number; // bpm for the noteline
}

interface NoteState {
    id: string;
    time: number; // note timing (ms)
    type: number; // note type (0-2) 0: tap, 1: hold start, 2: hold end
    hit: number; // hit timing (ms)
    judgement: number; // judgment text 0: not judged, 1: perfect, 2: great, 3: good, 4: bad, 5: miss
    percent: number; // percent of the note hit
}

interface TextState extends ObjectState{
    text: string; // text of the text
    style: PIXI.TextStyleOptions; // style of the text
}

interface SpriteState extends ObjectState{
    texture: string; // texture of the sprite
}

interface Judge{
    key: string; // key for the judge (e.g. "d", "f", "j", "k")
    time: number; // judge timing (ms)
    state: number; // 0: keydown, 1: keyup
}

interface GameState{
    backgroundColor: number; // background color of the game
    timeline: number; // current timeline (ms)
    judged: Judge[]; // judged notes
    notelines: NotelineState[]; // notelines in the game
    sprites: SpriteState[]; // sprites in the game
    texts: TextState[]; // texts in the game
    camera: ObjectState; // camera in the game
    combo: number; // current combo
    score: number; // current score
    health: number; // current health
    maxCombo: number; // max combo
    accuracy: number; // current accuracy
}

interface ObjectProps{
    id?: string;
    position?: Vector2;
    rotation?: number;
    scale?: Vector2;
    alpha?: number;
    pivot?: Vector2;
    filters?: Filter[];
    blendMode?: PIXI.BLEND_MODES;
    mask?: string; // object id for masking
}