import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_profile")
class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  carrots: number;

  constructor() {
    // 생성자에서 클래스 속성 초기화
    this.id = 0;
    this.password = "";
    this.name = "";
    this.email = "";
    this.carrots = 0;
  }
}

module.exports = UserProfile;
