import { animate, query, sequence, stagger, style, transition, trigger } from "@angular/animations";

export const zeroToFullWidthAnimation = trigger('zeroToFullWidthAnimation', [
	transition(':enter', [
		style({ width: 0 }),
		animate('200ms', style({ width: '100%' })),
	])
]);


export const dropdownAnimation = [
  trigger("dropdownAnimation", [
    transition(":enter", [
      style({ height: 0, overflow: "hidden" }),
      query(".option", [
        style({ opacity: 0, transform: "translateY(-50px)" })
      ]),
      sequence([
        animate("200ms", style({ height: "*" })),
        query(".option", [
          stagger(-50, [
            animate("400ms ease", style({ opacity: 1, transform: "none" }))
          ])
        ])
      ])
    ]),

    transition(":leave", [
      style({ height: "*", overflow: "hidden" }),
      query(".option", [style({ opacity: 1, transform: "none" })]),
      sequence([
        query(".option", [
          stagger(50, [
            animate(
              "400ms ease",
              style({ opacity: 0, transform: "translateY(-50px)" })
            )
          ])
        ]),
        animate("200ms", style({ height: 0 }))
      ])
    ])
  ])
];
