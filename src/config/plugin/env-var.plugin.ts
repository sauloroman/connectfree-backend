import 'dotenv/config'
import * as env from 'env-var'

export class EnvAdapter {

  public static PORT: number =
    env.get('PORT').required().asPortNumber()

  public static DATABASE_URL: string | undefined =
    env.get('DATABASE_URL').asString()

  public static POSTGRESDB_HOST: string | undefined =
    env.get('POSTGRESDB_HOST').asString()

  public static POSTGRESDB_USER: string | undefined =
    env.get('POSTGRESDB_USER').asString()

  public static POSTGRESDB_PASSWORD: string | undefined =
    env.get('POSTGRESDB_PASSWORD').asString()

  public static POSTGRESDB_NAME: string | undefined =
    env.get('POSTGRESDB_NAME').asString()

  public static POSTGRESDB_PORT: number | undefined =
    env.get('POSTGRESDB_PORT').asPortNumber()

  public static JWT_SEED: string =
    env.get('JWT_SEED').required().asString()
}
