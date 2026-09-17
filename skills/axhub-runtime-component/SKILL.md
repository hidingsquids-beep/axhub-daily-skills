---
name: axhub-runtime-component
description: Generate browser-side Axhub Runtime React component or page code for product prototypes. Use when the user asks for Axhub Runtime components, prototype component code, React prototype snippets, or pure browser React pages that must use the required Component root variable, inline styles or CSS-in-JS, self-contained state, and IE11-oriented JavaScript constraints.
---

# Axhub Runtime Component

Use this skill to create self-contained React prototype components that run inside Axhub Runtime. The typical user is a product manager or interaction designer, so keep the output clear, practical, and easy to paste into the runtime editor.

## Conversation Flow

When the user has not yet provided a concrete component or page requirement, reply exactly:

```text
了解，请描述你的需求
```

Then wait for the user to provide the requirement before writing code.

When the user has already provided a clear requirement, implement the component directly. Ask a short clarification only if the missing detail would materially change the structure or behavior.

## Output Contract

- Return a single JavaScript code block containing the component code.
- Do not include imports, exports, build configuration, package instructions, or external files.
- Define the root component exactly as `const Component = () => { ... }`.
- Keep all state, mock data, helper functions, and styles inside `Component`.
- Do not require external props, API calls, routing, stores, or backend services.
- Use Picsum images such as `https://picsum.photos/seed/store/320/180` for placeholder imagery unless the user provides specific assets.

## JavaScript Constraints

- Keep the required `const Component = () => {}` wrapper even though it is the Axhub Runtime convention.
- Outside that required wrapper, prefer IE11-oriented syntax: `var`, plain functions, simple loops, array indexing, and straightforward objects.
- Avoid `async/await`, destructuring, spread/rest syntax, optional chaining, nullish coalescing, classes, modules, generators, and advanced browser APIs.
- Avoid template literals; build strings with concatenation.
- Use `React.useState` for local state.
- Use `React.useMemo`, `React.useCallback`, and `React.useEffect` only when they make the component clearer or prevent meaningful repeated work.

## UI And Interaction Standards

- Build a polished modern prototype UI with clear hierarchy, balanced spacing, and restrained color choices.
- Support responsive layouts with percentages, `maxWidth`, `flexWrap`, adaptive grid behavior, and viewport-safe sizing.
- Use inline styles or CSS-in-JS style objects. Keep style names readable.
- Provide visible hover, click, selected, disabled, focus, empty, and error states when relevant to the requested interaction.
- Keep copy concise and product-oriented; avoid explanatory text about how the prototype works unless the user asks.
- Prefer realistic mock data that matches the domain instead of generic placeholder labels.

## Error Handling

- Guard against empty arrays, missing selected records, invalid numeric input, and out-of-range indexes.
- Show friendly inline fallback messages instead of throwing runtime errors.
- Keep interactions non-blocking and reversible where possible.

## Code Shape

Start from this structure and adapt it to the request:

```javascript
// Important: Axhub Runtime requires this exact component variable name.
const Component = () => {
	var initialItems = [
		{ id: 1, name: '示例项目', status: '进行中' }
	];

	var itemsState = React.useState(initialItems);
	var items = itemsState[0];
	var setItems = itemsState[1];
	var activeIdState = React.useState(1);
	var activeId = activeIdState[0];
	var setActiveId = activeIdState[1];

	var styles = {
		container: {
			padding: '20px',
			backgroundColor: '#ffffff',
			fontFamily: 'Arial, sans-serif',
			color: '#1f2937'
		}
	};

	var activeItem = React.useMemo(function () {
		for (var i = 0; i < items.length; i += 1) {
			if (items[i].id === activeId) {
				return items[i];
			}
		}
		return null;
	}, [items, activeId]);

	return (
		<div style={styles.container}>
			{activeItem ? activeItem.name : '暂无数据'}
		</div>
	);
};
```
