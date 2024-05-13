# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_12_195254) do
  create_table "activities", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "hostname"
    t.string "url"
    t.integer "time_spent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "date"
    t.index ["user_id", "url", "date"], name: "index_activities_on_user_id_and_url_and_date", unique: true
    t.index ["user_id"], name: "index_activities_on_user_id"
  end

  create_table "restricted_sites", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "hostname"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "hostname"], name: "index_restricted_sites_on_user_id_and_hostname", unique: true
    t.index ["user_id"], name: "index_restricted_sites_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "activities", "users"
  add_foreign_key "restricted_sites", "users"
end
