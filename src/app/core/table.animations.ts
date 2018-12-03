import { state, trigger, style, transition, animate } from "@angular/animations";
import { getStylesFromClasses } from "./animationUtils";

export const HighlightTrigger = trigger("rowHighlight", [
  state("selected", style(getStylesFromClasses(["bg-success", "h2"]))),
  state("notselected", style(getStylesFromClasses("bg-info"))),
  state("void", style({
    transform: "translateX(-50%)"
  })),
  transition("* => notselected", animate("200ms")),
  transition("* => selected", [
    animate("400ms 200ms ease-in",
      style({
        backgroundColor: "lightblue",
        fontSize: "25px"
      })),
    animate("250ms", style({
      backgroundColor: "lightcoral",
      fontSize: "30px"
    })),
    animate("200ms")
  ]),
  transition("void => *", animate("500ms"))
]);
