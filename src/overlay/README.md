# Note

#### If you are creating a new overlay component,

If your component is dependent on another component, use `raw-{component}.tsx` file of that component to create yours. Don't use `component.tsx`, as it contains the logic for re-positioning the component on update, and the update process goes into infinite loop if the the component which has re-positioning logic is wrapped into another component.

eg. we used `raw-popover.tsx` to create `raw-popover-confirm.tsx`. We didn't use `popover.tsx` directly inside the `popover-confirm.tsx`, because `popover.tsx` is responsible to the re-positioning logic, and wrapping it into the `popover-confirm.tsx` goes into infinite loop.
