import React from "react";

type AnyProps = Record<string, unknown> & { children?: React.ReactNode };

const STRIP_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "whileDrag",
  "drag",
  "dragConstraints",
  "viewport",
  "layoutId",
  "layout",
]);

function strip(props: AnyProps) {
  const out: AnyProps = {};
  for (const key of Object.keys(props)) {
    if (!STRIP_PROPS.has(key)) out[key] = props[key];
  }
  return out;
}

const handler: ProxyHandler<Record<string, never>> = {
  get(_target, prop: string) {
    return React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
      return React.createElement(
        prop,
        { ref, ...strip(props) },
        props.children as React.ReactNode,
      );
    });
  },
};

export const motion = new Proxy({}, handler) as unknown as Record<
  string,
  React.ComponentType<AnyProps>
>;

export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}

export function useReducedMotion() {
  return false;
}

export function useMotionValue<T>(initial: T) {
  return {
    get: () => initial,
    set: () => {},
    on: () => () => {},
  };
}

export function useTransform<T>(
  _source: unknown,
  mapperOrInput: ((v: number) => T) | number[],
  _output?: T[],
) {
  if (typeof mapperOrInput === "function") {
    return mapperOrInput(0);
  }
  // Interpolation form: useTransform(source, [in0, in1], [out0, out1])
  return _output ? _output[0] : 0;
}

export function useScroll() {
  return {
    scrollY: { get: () => 0, set: () => {}, on: () => () => {} },
    scrollYProgress: { get: () => 0, set: () => {}, on: () => () => {} },
    scrollX: { get: () => 0, set: () => {}, on: () => () => {} },
    scrollXProgress: { get: () => 0, set: () => {}, on: () => () => {} },
  };
}

export function animate() {
  return { stop: () => {} };
}
