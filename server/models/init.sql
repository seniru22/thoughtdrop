create table users(
    id serial primary key,
    username varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

create table user_token(
    id serial primary key,
    token varchar(255) not null,
    fk_user int not null,
    created_at timestamp not null default now(),
    constraint fk_user foreign key (fk_user) references users(id) on delete cascade on update cascade
);

create table blogs(
    id serial primary key,
    title varchar(255) not null,
    content text not null,
    author_id int not null,
    created_at timestamp not null default now(),
    constraint author_id foreign key (author_id) references users(id) on delete cascade on update cascade
);
