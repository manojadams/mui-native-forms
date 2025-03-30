export interface ExistsDependency {

}

export interface EnabledDependency {

}

export interface LoadDependency {

}

export interface EqualsDependency {

}

export interface DisplayTypeDependency {
    
}

export interface FieldDependency {
    exists?: ExistsDependency;
    enabled?: EnabledDependency;
    load?: LoadDependency;
    equals?: EqualsDependency;
    displayType?: DisplayTypeDependency;
};
