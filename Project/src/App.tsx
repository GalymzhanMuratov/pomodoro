import React, { createContext, useEffect, useRef, useState } from "react";
import './main.global.css'
import { Header } from "./shared/Header/Header";
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './shared/Layout/Layout'
import { Content } from './shared/Layout/Content/Content'
import { MainPage } from "./shared/Mainpage";
import { StatsPage } from "./shared/Statspage";
import { Provider } from "react-redux";
import { store } from "./store/store";

function AppComponent() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Provider store={store} >


            {mounted && (
                <BrowserRouter>
                    <Header />
                    <Layout>
                        <Content>
                            <Routes>
                                <Route path="/" element={<MainPage />} ></Route>
                                <Route path="/stats" element={<StatsPage totaltime={120} pausetime={10} pauses={2} day="Суббота" pomodors={2} />} ></Route>
                            </Routes>
                        </Content>
                    </Layout>
                </BrowserRouter>
            )}
        </Provider>

    )
}

export const App = hot(() => <AppComponent />)