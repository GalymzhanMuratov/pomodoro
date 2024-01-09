import React from 'react'
import styles from './taskmanagement.css'
import { EIcons, Icon } from '../../Icons'
import { TaskList } from './TaskList'
import { TaskFormContainer } from './TaskFormContainer'


export function TaskManagement() {
    return (
        <div>
            <h2 className={styles.title}>Ура! Теперь можно начать работать:</h2>
            <div className={styles.wrap}>
                <div className={styles.inline}>
                    <Icon name={EIcons.bullet} />
                </div>
                <div className={styles.desc}>
                    <div>
                        Выберите категорию и напишите название текущей задачи
                    </div>
                    <div>
                        Запустите таймер («помидор»)
                    </div>
                    <div>
                        Работайте пока «помидор» не прозвонит
                    </div>
                    <div>
                        Сделайте короткий перерыв (3-5 минут)
                    </div>
                    <div>
                        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                    </div>
                </div>
            </div>
            <TaskFormContainer />
            <TaskList />
        </div>
    )
}