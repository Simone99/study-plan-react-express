import sqlite3
import hashlib

DB_PATH = './server/StudyPlanDB.db'


def initialize_db(cursor):
    create_course_table_query = '''CREATE TABLE IF NOT EXISTS COURSES(''' \
                                '''CODE VARCHAR(7) PRIMARY KEY, ''' \
                                '''NAME VARCHAR(100) NOT NULL, ''' \
                                '''CREDITS INTEGER NOT NULL, ''' \
                                '''MAX_STUDENTS INTEGER, ''' \
                                '''DEPENDENCY VARCHAR(7)''' \
                                ''')'''

    create_incompatibility_table_query = '''CREATE TABLE IF NOT EXISTS INCOMPATIBILITIES(''' \
                                         '''COURSE_CODE VARCHAR(7), ''' \
                                         '''INCOMPATIBLE_COURSE_CODE VARCHAR(7), ''' \
                                         '''PRIMARY KEY(COURSE_CODE, INCOMPATIBLE_COURSE_CODE), ''' \
                                         '''FOREIGN KEY(COURSE_CODE) REFERENCES COURSES(CODE), ''' \
                                         '''FOREIGN KEY(INCOMPATIBLE_COURSE_CODE) REFERENCES COURSES(CODE) ''' \
                                         ''')'''

    create_students_table_query = '''CREATE TABLE IF NOT EXISTS STUDENTS(''' \
                                  '''EMAIL VARCHAR(50) PRIMARY KEY, ''' \
                                  '''NAME VARCHAR(50) NOT NULL, ''' \
                                  '''SURNAME VARCHAR(50) NOT NULL, ''' \
                                  '''PASSWORD VARCHAR(64) NOT NULL, ''' \
                                  '''FULLTIME INTEGER NOT NULL''' \
                                  ''')'''

    create_studyplan_table_query = '''CREATE TABLE IF NOT EXISTS STUDY_PLANS(''' \
                                   '''COURSE_CODE VARCHAR(7), ''' \
                                   '''STUDENT_EMAIL VARCHAR(50), ''' \
                                   '''PRIMARY KEY(COURSE_CODE, STUDENT_EMAIL), ''' \
                                   '''FOREIGN KEY(COURSE_CODE) REFERENCES COURSES(CODE), ''' \
                                   '''FOREIGN KEY(STUDENT_EMAIL) REFERENCES STUDENTS(EMAIL)''' \
                                   ''')'''

    cursor.execute('''DROP TABLE IF EXISTS COURSES''')
    cursor.execute('''DROP TABLE IF EXISTS INCOMPATIBILITIES''')
    cursor.execute('''DROP TABLE IF EXISTS STUDENTS''')
    cursor.execute('''DROP TABLE IF EXISTS STUDY_PLANS''')
    cursor.execute(create_course_table_query)
    cursor.execute(create_incompatibility_table_query)
    cursor.execute(create_students_table_query)
    cursor.execute(create_studyplan_table_query)


def fill_db(cursor):
    courses_query = '''INSERT INTO COURSES(CODE, NAME, CREDITS, MAX_STUDENTS, DEPENDENCY) VALUES(?,?,?,?,?)'''
    dependency_query = '''INSERT INTO INCOMPATIBILITIES(COURSE_CODE, INCOMPATIBLE_COURSE_CODE) VALUES(?,?)'''
    students_query = '''INSERT INTO STUDENTS(EMAIL, NAME, SURNAME, PASSWORD, FULLTIME) VALUES(?,?,?,?,?)'''
    study_plan_query = '''INSERT INTO STUDY_PLANS(COURSE_CODE, STUDENT_EMAIL) VALUES(?,?)'''
    
    courses_list = [
        ('02GOLOV', 'Architetture dei sistemi di elaborazione', 12, None, None),
        ('02LSEOV', 'Computer architectures', 12, None, None),
        ('01SQJOV', 'Data Science and Database Technology', 8, None, None),
        ('01SQMOV', 'Data Science e Tecnologie per le Basi di Dati ', 8, None, None),
        ('01SQLOV', 'Database systems', 8, None, None),
        ('01OTWOV', 'Computer network technologies and services', 6, 3, None),
        ('02KPNOV', 'Tecnologie e servizi di rete ', 6, 3, None),
        ('01TYMOV', 'Information systems security services', 12, None, None),
        ('01UDUOV', 'Sicurezza dei sistemi informativi', 12, None, None),
        ('05BIDOV', 'Ingegneria del software', 6, None, '02GOLOV'),
        ('04GSPOV', 'Software engineering', 6, None, '02LSEOV'),
        ('01UDFOV', 'Applicazioni Web I', 6, None, None),
        ('01TXYOV', 'Web Applications I', 6, 3, None),
        ('01TXSOV', 'Web Applications II', 6, None, '01TXYOV'),
        ('02GRSOV', 'Programmazione di sistema', 6, None, None),
        ('01NYHOV', 'System and device programming', 6, 3, None),
        ('01SQOOV', 'Reti Locali e Data Center', 6, None, None),
        ('01TYDOV', 'Software networking', 7, None, None),
        ('03UEWOV', 'Challenge', 5, None, None),
        ('01URROV', 'Computational intelligence', 6, None, None),
        ('01OUZPD', 'Model based software design', 4, None, None),
        ('01URSPD', 'Internet Video Streaming', 6, 2, None)
    ]
    dependencies_list = [
        ('02GOLOV', '02LSEOV'),
        ('02LSEOV', '02GOLOV'),
        ('01SQJOV', '01SQMOV'),
        ('01SQMOV', '01SQJOV'),
        ('01SQMOV', '01SQLOV'),
        ('01SQLOV', '01SQJOV'),
        ('01SQLOV', '01SQMOV'),
        ('01OTWOV', '02KPNOV'),
        ('02KPNOV', '01OTWOV'),
        ('01TYMOV', '01UDUOV'),
        ('01UDUOV', '01TYMOV'),
        ('05BIDOV', '04GSPOV'),
        ('04GSPOV', '05BIDOV'),
        ('01UDFOV', '01TXYOV'),
        ('01TXYOV', '01UDFOV'),
        ('02GRSOV', '01NYHOV'),
        ('01NYHOV', '02GRSOV')
    ]
    students_list = [
        ('s295316@studenti.polito.it', 'Simone', 'Zanella', hashlib.sha256(b'password').hexdigest(), True),
        ('s123456@studenti.polito.it', 'Name1', 'Surname2', hashlib.sha256(b'password').hexdigest(), False),
        ('s956325@studenti.polito.it', 'Name2', 'Surname2', hashlib.sha256(b'password').hexdigest(), True),
        ('s462034@studenti.polito.it', 'Name3', 'Surname3', hashlib.sha256(b'password').hexdigest(), False),
        ('s254991@studenti.polito.it', 'Name4', 'Surname4', hashlib.sha256(b'password').hexdigest(), False)
    ]
    study_plan_list = [
        ('01URSPD', 's295316@studenti.polito.it'),
        ('01URSPD', 's123456@studenti.polito.it'),
        ('01NYHOV', 's295316@studenti.polito.it'),
        ('01TXYOV', 's295316@studenti.polito.it'),
        ('01TYMOV', 's295316@studenti.polito.it'),
        ('02LSEOV', 's295316@studenti.polito.it'),
        ('01NYHOV', 's123456@studenti.polito.it'),
        ('01URROV', 's123456@studenti.polito.it'),
        ('01NYHOV', 's956325@studenti.polito.it'),
        ('03UEWOV', 's956325@studenti.polito.it'),
        ('01TYDOV', 's956325@studenti.polito.it'),
        ('01SQJOV', 's462034@studenti.polito.it')
    ]

    cursor.executemany(courses_query, courses_list)
    cursor.executemany(dependency_query, dependencies_list)
    cursor.executemany(students_query, students_list)
    cursor.executemany(study_plan_query, study_plan_list)


if __name__ == '__main__':
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    initialize_db(cur)
    fill_db(cur)
    con.commit()
    con.close()
