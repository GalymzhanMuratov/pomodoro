import React, { useEffect, useState } from "react";
import './main.global.css'
import styles from './app.css'
import { Header } from "./shared/Header/Header";
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './shared/Layout/Layout'
import { Content } from './shared/Layout/Content/Content'
import { MainPage } from "./shared/Mainpage";
import { StatsPage } from "./shared/Statspage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useLocalStorage } from "./hooks/useLocalStorage";

function AppComponent() {

    const [mounted, setMounted] = useState(false)

    const [isDark, setIsDark] = useLocalStorage('dark', false)

    function themeSwitch() {
        setIsDark(!isDark)
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {


    }, [isDark])

    return (
        <Provider store={store} >


            {mounted && (
                <div className={styles.app} data-theme={isDark ? 'dark' : ''}>

                    <BrowserRouter>
                        <Header handleChange={themeSwitch} />
                        <Layout>
                            <Content>
                                <Routes>
                                    <Route path="/" element={<MainPage />} ></Route>
                                    <Route path="/stats" element={<StatsPage totaltime={120} pausetime={10} pauses={2} day="Суббота" pomodors={2} />} ></Route>
                                </Routes>
                            </Content>
                        </Layout>
                    </BrowserRouter>
                </div>
            )}
        </Provider>

    )
}

export const App = hot(() => <AppComponent />)