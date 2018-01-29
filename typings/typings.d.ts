/**
 * For including *.json file as
 * `import * as <stuff> from './stuffs.json';`
 */

declare module '*.json' {
	const value: any;
	export = value;
}
