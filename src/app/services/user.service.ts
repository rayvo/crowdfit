import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 

export interface User {
    uid: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    usertype: string,
    birthday: string
}

@Injectable()
export class UserService {
    private user: User
    private usersCollection: AngularFirestoreCollection<User>
    private users: Observable<User[]>

    constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
        this.usersCollection = db.collection<User>('users');
        this.users = this.usersCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data()
                    const id = a.payload.doc.id
                    return {id, ...data}
                })
            })
        )
    }

    getUsers() {
        return this.users;
    }

    getUser(id) {
        return this.usersCollection.doc<User>(id).valueChanges()
    }

    updateUser(user: User, id: string) {
        return this.usersCollection.doc(id).update(user)
    }

    addUser(user: User) {
        return this.usersCollection.add(user)
    }

    removeUser(id) {
        return this.usersCollection.doc(id).delete()
    }

    //----------------------------------------------------------
    setPartlyUser(uid: string, name: string, email: string, phone: string) {
        this.user.uid = uid
        this.user.name = name
        this.user.email = email
        this.user.phone = phone

    }

    setUser(user: User) {
        this.user = user
    }

    getUID() {
        if (!this.user) {
            if (this.afAuth.auth.currentUser) {
                const userAuth = this.afAuth.auth.currentUser
                this.user.uid = userAuth.uid
                this.user.email = userAuth.email                
                return this.user.uid
            } else {
                throw new Error("User not looged in")
            }
            
        } else {
            return this.user.uid
        }
        
    }
}