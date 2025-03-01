/** @typedef {typeof __propDef.props}  PanelProps */
/** @typedef {typeof __propDef.events}  PanelEvents */
/** @typedef {typeof __propDef.slots}  PanelSlots */
export default class Panel extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PanelProps = typeof __propDef.props;
export type PanelEvents = typeof __propDef.events;
export type PanelSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
