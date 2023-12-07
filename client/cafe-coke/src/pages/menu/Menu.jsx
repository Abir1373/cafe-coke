import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Category from "./Category";
import Navbar from "../../shared/Navbar";

const Menu = () => {
    return (
        <div className="space-y-5 flex flex-col items-center">
            <span className='flex items-center justify-center text-4xl font-bold uppercase m-9 text-rose-400'>
                Menu !
            </span>
            <div className="flex mx-auto justify-center">
                <Navbar></Navbar>
            </div>

            <Tabs aria-label="Options" className="text-2xl text-white font-bold bg-gray-700 items-center" >
                <Tab key="Coffee" title="Coffee" className="h-16 mr-5 p-5">
                    <Card>
                        <CardBody>
                            <div>
                                <Category category='coffees'></Category>
                            </div>

                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Desserts" title="Desserts" className="h-16 p-5">
                    <Card>
                        <CardBody>
                            <div>
                                <Category category='desserts'></Category>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>

    );
}

export default Menu; 
