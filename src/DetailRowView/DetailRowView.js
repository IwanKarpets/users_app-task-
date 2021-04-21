import React from 'react'

function DetailRowView({person}) {
    return (
        <div>
            <p>Выбран пользователь <b>{person.name+' '+person.username}</b></p>
                 Описание: {person.company.name}
        </div>
    )
}

export default DetailRowView




