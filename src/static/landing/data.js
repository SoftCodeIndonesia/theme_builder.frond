import helper from '../../helper/index';

const promo = [
    {
        id: 1,
        product: "free",
        offer: "tailwind",
        title: "Dashboard Template",
        description: "Hello world! free",
        banner: "https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png",
        
        link: "#",
        isButton: true,
        isActive: helper.isDeadline(new Date("February 28, 2023 23:59:59")),
    },
    {
        id: 2,
        product: "free",
        offer: "bootstrap",
        title: "Landing Page",
        description: "This is a new template premium",
        banner: "https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png",
        
        link: "#",
        isButton: true,
        isActive: helper.isDeadline(new Date("February 28, 2023 23:59:59")),
    },
    {
        id: 3,
        product: "premium",
        offer: "bootstrap",
        title: "Landing Page",
        description: "This is a new template bootstrap",
        banner: "https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png",
        
        link: "#",
        isButton: true,
        isActive: helper.isDeadline(new Date("February 28, 2023 23:59:59")),
    },
    {
        id: 4,
        product: "premium",
        offer: "tailwind",
        title: "Landing Page",
        description: "This is a new template bootstrap",
        banner: "https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png",
        
        link: "#",
        isButton: true,
        isActive: helper.isDeadline(new Date("February 28, 2023 23:59:59")),
    },
]


const data = {
    promo,
}

export default data;



