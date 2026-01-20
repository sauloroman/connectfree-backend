import express from 'express'
import cors from 'cors'
import { Application, Router } from "express";

interface ServerConfigurationOptions {
    router: Router,
    publicPath?: string
}

export class ServerConfiguration {

    private readonly _app: Application

    constructor({ router, publicPath = 'public' }: ServerConfigurationOptions) {
        this._app = express()

        this._app.use( cors() )
        this._app.use( express.json() )
        this._app.use( express.urlencoded({ extended: true }))
        this._app.use( express.static( publicPath ) )
        this._app.use( router )
    }

    public get application(): Application {
        return this._app
    }

}