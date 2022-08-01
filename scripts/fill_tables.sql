with roles_json (doc) as (
   values 
    ('[

    { "id": 1, "role_code": "genius", "role_name": "Genius" },

    { "id": 2, "role_code": "leader", "role_name": "Leader" },

    { "id": 3, "role_code": "quinn", "role_name": "Arrow Man" },

    { "id": 4, "role_code": "spy", "role_name": "Master Spy" },

    { "id": 5, "role_code": "hammergod", "role_name": "God Of Hammers" },

    { "id": 6, "role_code": "organizer", "role_name": "Organizer of Stuff" },

    { "id": 7, "role_code": "hulksmash", "role_name": " Smasher Of Things...also scientist" },

    { "id": 8, "role_code": "cto", "role_name": "CTO" },

    { "id": 9, "role_code": "wintersoldier", "role_name": "Winter Soldier" },

    { "id": 10, "role_code": "spiderman", "role_name": "Spiderman" }

  ]
'::json)
)
insert into roles (id, role_code, role_name)
select r.*
from roles_json l
  cross join lateral json_populate_recordset(null::roles, doc) as r
on conflict (id) do update 
  set role_code = excluded.role_code, 
      role_name = excluded.role_name;



with employees_json (doc) as (
   values 
    ('[

    { "id": 1, "name": "Tony Stark", "email": "tony.stark@avengers.com", "username": "tonystark", "role_id": 1},

    { "id": 2, "name": "Steve Rogers", "email": "steve.rogers@avengers.com", "username": "steverogers", "role_id": 2 },

    { "id": 3, "name": "Clint Barton", "email": "clint.barton@avengers.com", "username": "clintbarton", "role_id": 3 },

    { "id": 4, "name": "Natasha Romanoff", "email": "natasha.romanoff@avengers.com", "username": "natasharomanoff", "role_id": 4 },

    { "id": 5, "name": "Thor Odinson", "email": "thor.odinson@avengers.com", "username": "thorodinson", "role_id": 5 },

    { "id": 6, "name": "Nick Fury", "email": "nick.fury@avengers.com", "username": "nickfury", "role_id": 6 },

    { "id": 7, "name": "Bruce Banner", "email": "bruce.banner@avengers.com", "username": "brucebanner", "role_id": 7 },

    { "id": 8, "name": "Maria Hill", "email": "maria.hill@avengers.com", "username": "mariahill", "role_id": 8 },

    { "id": 9, "name": "Bucky Barnes", "email": "bucky.barnes@avengers.com", "username": "buckybarnes", "role_id": 9 },

    { "id": 10, "name": "Peter Parker", "email": "peter.parker@avengers.com", "username": "peterparker", "role_id": 10 }

  ]

'::json)
)
insert into employees (id, name, email, username, role_id)
select e.*
from employees_json l
  cross join lateral json_populate_recordset(null::employees, doc) as e
on conflict (id) do update 
  set name = excluded.name, 
      email = excluded.email,
			username = excluded.username,
			role_id = excluded.role_id;

