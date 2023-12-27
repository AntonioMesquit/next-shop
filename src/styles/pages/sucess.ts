import { styled } from "@stitches/react";

export const SucessContainer = styled('main' , {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    height: 656,

    h1: {
        fontSize: "$2xl",
        color: "$grey100",

    },
    p: {
        fontSize: '$xl',
        color: "$grey300",
        maxWidth: 560,
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "5rem",
        

    },
    a: {
        display: "block",
        fontSize: "$lg",
        color: "$green500",
        textDecoration: "none",

    }
    
    
}
)

export const ImageContainer = styled('div' , {
    width: "100%",
    maxWidth: 130,
    height: 145,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: "0.25rem",
    display: "flex",
    alignItems: "center",
    marginTop: "4rem",
    justifyContent: "center",

    img: {
        objectFit: "cover",
    }

}
)