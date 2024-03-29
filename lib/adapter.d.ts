import { Model, FilteredAdapter, UpdatableAdapter } from 'casbin';
import { CasbinRule } from './casbinRule';
import { DataSource, DataSourceOptions, FindOptionsWhere } from 'typeorm';
import { CasbinMongoRule } from './casbinMongoRule';
type GenericCasbinRule = CasbinRule | CasbinMongoRule;
type CasbinRuleConstructor = new (...args: any[]) => GenericCasbinRule;
interface ExistentConnection {
    connection: DataSource;
}
export type TypeORMAdapterOptions = ExistentConnection | DataSourceOptions;
export interface TypeORMAdapterConfig {
    customCasbinRuleEntity?: CasbinRuleConstructor;
}
/**
 * TypeORMAdapter represents the TypeORM filtered adapter for policy storage.
 */
export default class TypeORMAdapter implements FilteredAdapter, UpdatableAdapter {
    private adapterConfig?;
    private option;
    private typeorm;
    private filtered;
    private constructor();
    isFiltered(): boolean;
    /**
     * newAdapter is the constructor.
     * @param option typeorm connection option
     * @param adapterConfig additional configuration options for the adapter
     */
    static newAdapter(option: TypeORMAdapterOptions, adapterConfig?: TypeORMAdapterConfig): Promise<TypeORMAdapter>;
    private open;
    close(): Promise<void>;
    private clearTable;
    private loadPolicyLine;
    /**
     * loadPolicy loads all policy rules from the storage.
     */
    loadPolicy(model: Model): Promise<void>;
    loadFilteredPolicy(model: Model, filter: FindOptionsWhere<GenericCasbinRule>): Promise<void>;
    private escapeCsv;
    private savePolicyLine;
    /**
     * savePolicy saves all policy rules to the storage.
     */
    savePolicy(model: Model): Promise<boolean>;
    /**
     * addPolicy adds a policy rule to the storage.
     */
    addPolicy(sec: string, ptype: string, rule: string[]): Promise<void>;
    /**
     * addPolicies adds policy rules to the storage.
     */
    addPolicies(sec: string, ptype: string, rules: string[][]): Promise<void>;
    updatePolicy(sec: string, ptype: string, oldRule: string[], newRule: string[]): Promise<void>;
    /**
     * removePolicy removes a policy rule from the storage.
     */
    removePolicy(sec: string, ptype: string, rule: string[]): Promise<void>;
    /**
     * removePolicies removes policy rules from the storage.
     */
    removePolicies(sec: string, ptype: string, rules: string[][]): Promise<void>;
    /**
     * removeFilteredPolicy removes policy rules that match the filter from the storage.
     */
    removeFilteredPolicy(sec: string, ptype: string, fieldIndex: number, ...fieldValues: string[]): Promise<void>;
    private getCasbinRuleConstructor;
    /**
     * Returns either a {@link CasbinRule} or a {@link CasbinMongoRule}, depending on the type. If passed a custom entity through the adapter config it will use that entity type.
     * This switch is required as the normal {@link CasbinRule} does not work when using MongoDB as a backend (due to a missing ObjectId field).
     * @param type
     * @param adapterConfig
     */
    private static getCasbinRuleType;
    private getRepository;
}
export {};
